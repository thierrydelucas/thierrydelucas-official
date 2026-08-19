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

  it("displays copyright notice with artist name", () => {
    cy.get("[data-cy=footer-copyright]")
      .should("be.visible")
      .and("contain.text", "© 2026 Thierry de Lucas. All rights reserved.");
  });

  it("links the developer credit to LinkedIn in a new tab", () => {
    cy.get("[data-cy=footer-credit]")
      .should("be.visible")
      .and("contain.text", "Site developed by Gustavo Leite");

    cy.get("[data-cy=footer-developer-link]")
      .should("have.attr", "href", "https://www.linkedin.com/in/gustavoaraujoleite/")
      .and("have.attr", "target", "_blank")
      .and("have.attr", "rel", "noopener noreferrer")
      .and("contain.text", "Gustavo Leite");
  });

  it("renders social profile links that open externally in a new tab", () => {
    cy.get("[data-cy=footer-social-links]").children().should("have.length", 4);

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

  it("links the mail icon to the contact page without opening a new tab", () => {
    cy.get("[data-cy=footer-social-link-contact]")
      .should("have.attr", "href", "/en/contact")
      .and("not.have.attr", "target")
      .and("have.attr", "title", "Contact Thierry de Lucas")
      .and("have.attr", "aria-label", "Contact Thierry de Lucas");
  });
});
