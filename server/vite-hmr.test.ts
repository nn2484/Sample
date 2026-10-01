import { describe, expect, it } from "vitest";
import { getHmrClientOptions } from "./vite-hmr";

describe("getHmrClientOptions", () => {
  it("uses the secure public ingress for HTTPS WebDev previews", () => {
    expect(getHmrClientOptions("https://3000-example.manus.computer")).toEqual({
      protocol: "wss",
      clientPort: 443,
    });
  });

  it("keeps local HTTP development on Vite's default connection settings", () => {
    expect(getHmrClientOptions("http://localhost:3000")).toEqual({});
  });

  it("keeps default settings when no preview origin is provided", () => {
    expect(getHmrClientOptions()).toEqual({});
  });
});
