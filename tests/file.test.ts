import app from "../src/app";
import supertest from "supertest";
import path from "path";
import * as fs from "fs";

const agent = supertest(app);
const dir = path.resolve();
const pdf = path.join(dir, "tests/testFiles/test.pdf");
const txt = path.join(dir, "tests/testFiles/test.txt");
const xml = path.join(dir, "tests/testFiles/test.xml");

describe("Upload test", () => {
  it("Create a file txt", async () => {
    const response = await agent.post("/").attach("file", txt, { contentType: "multipart/form-data" });
    expect(response.statusCode).toBe(201);
    expect(fs.existsSync(dir + "/files/test.txt")).toBe(true);
    fs.rmSync(dir + "/files/test.txt");
  });
  it("Create a file pdf", async () => {
    const response = await agent.post("/").attach("file", pdf, { contentType: "multipart/form-data" });
    expect(response.statusCode).toBe(201);
    expect(fs.existsSync(dir + "/files/test.pdf")).toBe(true);
    fs.rmSync(dir + "/files/test.pdf");
  });
  it("Create a file xml", async () => {
    const response = await agent.post("/").attach("file", xml, { contentType: "multipart/form-data" });
    expect(response.statusCode).toBe(201);
    expect(fs.existsSync(dir + "/files/test.xml")).toBe(true);
    fs.rmSync(dir + "/files/test.xml");
  });
});
