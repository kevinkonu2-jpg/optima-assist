import { describe, expect, it } from "vitest";
import { contactInput } from "./routers";

describe("contactInput", () => {
  it("accepts a complete and correctly formatted request", () => {
    const result = contactInput.safeParse({
      name: "Afi Mensah",
      email: "afi@example.com",
      service: "Organisation d’agenda",
      message: "J’aimerais déléguer la coordination de mes rendez-vous.",
    });

    expect(result.success).toBe(true);
  });

  it("rejects incomplete or malformed requests", () => {
    const result = contactInput.safeParse({
      name: "A",
      email: "not-an-email",
      service: "",
      message: "Trop court",
    });

    expect(result.success).toBe(false);
  });
});
