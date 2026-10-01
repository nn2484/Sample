import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { UNIVERSITIES } from './src/data/universities';
import { SCHOLARSHIPS } from './src/data/scholarships';
import { UNIVERSITY_CHECKLISTS } from './src/data/checklists';
import { ROADMAP_TRACKS } from './src/data/roadmaps';
import { getAllUnifiedDeadlines } from './src/utils/deadlines';
import { computeAggregate } from './src/utils/calculatorEngine';
import { Program, University } from './src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Enable CORS for web requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// ---------------------------------------------------------------------------
// 1. Health & Meta Endpoints
// ---------------------------------------------------------------------------
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'Merit Ledger Web Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    universitiesCount: UNIVERSITIES.length,
    scholarshipsCount: SCHOLARSHIPS.length
  });
});

// ---------------------------------------------------------------------------
// 2. University Directory Endpoints
// ---------------------------------------------------------------------------
app.get('/api/universities', (req: Request, res: Response) => {
  const { sector, city, field, search } = req.query;
  let list = UNIVERSITIES;

  if (sector && typeof sector === 'string') {
    list = list.filter(u => u.sector.toLowerCase() === sector.toLowerCase());
  }

  if (city && typeof city === 'string') {
    list = list.filter(u => u.city.toLowerCase() === city.toLowerCase());
  }

  if (field && typeof field === 'string') {
    list = list.filter(u => u.programs.some(p => p.field.toLowerCase() === field.toLowerCase()));
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    list = list.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.shortName.toLowerCase().includes(q) ||
      u.city.toLowerCase().includes(q) ||
      u.programs.some(p => p.name.toLowerCase().includes(q))
    );
  }

  res.json(list);
});

app.get('/api/universities/:id', (req: Request, res: Response) => {
  const uni = UNIVERSITIES.find(u => u.id === req.params.id);
  if (!uni) {
    return res.status(404).json({ error: 'University not found' });
  }
  res.json(uni);
});

// ---------------------------------------------------------------------------
// 3. Merit Aggregate Calculator Endpoint
// ---------------------------------------------------------------------------
app.post('/api/calculator/calculate', (req: Request, res: Response) => {
  const { universityId, programId, matricPercentage, interPercentage, testScore } = req.body;

  const uni = UNIVERSITIES.find(u => u.id === universityId);
  if (!uni) {
    return res.status(400).json({ error: 'Invalid universityId' });
  }

  const prog = uni.programs.find(p => p.id === programId) || uni.programs[0];
  if (!prog) {
    return res.status(400).json({ error: 'Program not found for university' });
  }

  const result = computeAggregate(prog.formula, {
    matricPercentage: parseFloat(matricPercentage) || 0,
    interPercentage: parseFloat(interPercentage) || 0,
    testScore: parseFloat(testScore) || 0
  });

  res.json({
    university: {
      id: uni.id,
      name: uni.name,
      shortName: uni.shortName
    },
    program: {
      id: prog.id,
      name: prog.name,
      field: prog.field,
      approxClosingAggregate: prog.approxClosingAggregate,
      stretchThreshold: prog.stretchThreshold,
      safeThreshold: prog.safeThreshold
    },
    formula: prog.formula,
    calculation: result
  });
});

// ---------------------------------------------------------------------------
// 4. Scholarship Database Endpoints
// ---------------------------------------------------------------------------
app.get('/api/scholarships', (req: Request, res: Response) => {
  const { type, destination, search } = req.query;
  let list = SCHOLARSHIPS;

  if (type && typeof type === 'string') {
    list = list.filter(s => s.type === type);
  }

  if (destination && typeof destination === 'string') {
    list = list.filter(s => s.destination === destination);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    list = list.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.provider.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q)
    );
  }

  res.json(list);
});

// ---------------------------------------------------------------------------
// 5. Document Checklists
// ---------------------------------------------------------------------------
app.get('/api/checklists', (_req: Request, res: Response) => {
  res.json(Object.values(UNIVERSITY_CHECKLISTS));
});

app.get('/api/checklists/:universityId', (req: Request, res: Response) => {
  const chk = UNIVERSITY_CHECKLISTS[req.params.universityId] || UNIVERSITY_CHECKLISTS['nust'];
  res.json(chk);
});

// ---------------------------------------------------------------------------
// 6. Career Roadmaps
// ---------------------------------------------------------------------------
app.get('/api/roadmaps', (_req: Request, res: Response) => {
  res.json({
    pakistan: ROADMAP_TRACKS.filter(r => r.trackType === 'pakistan'),
    abroad: ROADMAP_TRACKS.filter(r => r.trackType === 'abroad')
  });
});

// ---------------------------------------------------------------------------
// 7. Personalized Recommendations Engine
// ---------------------------------------------------------------------------
app.post('/api/recommendations', (req: Request, res: Response) => {
  const { matricPercent = 80, interPercent = 78, field, city, budgetTier } = req.body;

  const estimatedScore = (Number(matricPercent) * 0.3) + (Number(interPercent) * 0.7);

  interface ProgramMatch {
    university: University;
    program: Program;
    fitType: 'safe' | 'target' | 'stretch';
    closingDiff: number;
  }

  const matches: ProgramMatch[] = [];

  UNIVERSITIES.forEach(uni => {
    if (city && city !== 'all' && uni.city.toLowerCase() !== city.toLowerCase()) return;
    if (budgetTier === 'public' && uni.sector !== 'public') return;

    uni.programs.forEach(prog => {
      if (field && field !== 'all' && prog.field !== field) return;

      const closing = prog.approxClosingAggregate || 75;
      const diff = estimatedScore - closing;

      let fitType: 'safe' | 'target' | 'stretch' = 'target';
      if (diff >= 3) fitType = 'safe';
      else if (diff >= -3) fitType = 'target';
      else if (diff >= -8) fitType = 'stretch';
      else return;

      matches.push({
        university: uni,
        program: prog,
        fitType,
        closingDiff: Number(diff.toFixed(1))
      });
    });
  });

  const matchingScholarships = SCHOLARSHIPS.filter(sch => {
    if (budgetTier === 'need_scholarship' && (sch.type === 'need_based' || sch.type === 'need_and_merit')) return true;
    if (estimatedScore >= 85 && (sch.type === 'merit_based' || sch.type === 'need_and_merit')) return true;
    return false;
  }).slice(0, 4);

  res.json({
    estimatedScore: Number(estimatedScore.toFixed(2)),
    safe: matches.filter(m => m.fitType === 'safe').slice(0, 8),
    target: matches.filter(m => m.fitType === 'target').slice(0, 8),
    stretch: matches.filter(m => m.fitType === 'stretch').slice(0, 8),
    matchingScholarships
  });
});

// ---------------------------------------------------------------------------
// 8. Deadlines Tracker
// ---------------------------------------------------------------------------
app.get('/api/deadlines', (_req: Request, res: Response) => {
  const deadlines = getAllUnifiedDeadlines();
  res.json(deadlines);
});

// ---------------------------------------------------------------------------
// Vite / Static Server integration
// ---------------------------------------------------------------------------
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Merit Ledger] Web server listening on port ${PORT}`);
  });
}

startServer();
