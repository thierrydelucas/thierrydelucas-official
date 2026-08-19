import Footer from "@/src/shared/presentation/components/Footer";

const SOCIAL_PROFILES = [
  {
    id: 1,
    href: "https://www.facebook.com/thierry.delucasneves",
    label: "Thierry de Lucas on Facebook",
  },
  {
    id: 2,
    href: "https://www.instagram.com/thierrydelucas",
    label: "Thierry de Lucas on Instagram",
  },
] as const;

describe("Footer", () => {
  beforeEach(() => {
    cy.mount(<Footer />);
  });

  it("displays contact email so users can reach Thierry", () => {
    cy.get("[data-cy=footer-contact-email]")
      .should("be.visible")
      .and("contain.text", "thierrydelucas.violin@gmail.com");
  });

  it("displays copyright notice with artist name", () => {
    cy.get("[data-cy=footer-copyright]")
      .should("be.visible")
      .and("contain.text", "© 2026 Thierry de Lucas. All rights reserved.");
  });

  it("renders social profile links that open externally in a new tab", () => {
    cy.get("[data-cy=footer-social-links]").children().should("have.length", 3);

    SOCIAL_PROFILES.forEach(({ id, href }) => {
      cy.get(`[data-cy=footer-social-link-${id}]`)
        .should("have.attr", "href", href)
        .and("have.attr", "target", "_blank")
        .and("have.attr", "rel", "noopener noreferrer");
    });
  });

  it("provides accessible labels for each social icon", () => {
    SOCIAL_PROFILES.forEach(({ id, label }) => {
      cy.get(`[data-cy=footer-social-link-${id}]`)
        .should("have.attr", "title", label)
        .find("img")
        .should("have.attr", "alt", label);
    });

    cy.get("[data-cy=footer-social-link-3]")
      .find("img")
      .should("have.attr", "alt", "Thierry de Lucas on Spotify");
  });
});
