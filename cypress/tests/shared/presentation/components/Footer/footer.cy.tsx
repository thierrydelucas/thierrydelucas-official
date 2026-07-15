import Footer from "@/src/shared/presentation/components/Footer";

const SOCIAL_PROFILES = [
  {
    id: 1,
    href: "https://www.facebook.com/thierry.delucasneves",
    label: "facebook",
  },
  {
    id: 2,
    href: "https://www.instagram.com/thierrydelucas",
    label: "instagram",
  },
  {
    id: 3,
    href: "https://www.facebook.com/thierrydelucas",
    label: "facebook",
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
    cy.get("[data-cy=footer-social-links]")
      .children()
      .should("have.length", SOCIAL_PROFILES.length);

    SOCIAL_PROFILES.forEach(({ id, href }) => {
      cy.get(`[data-cy=footer-social-link-${id}]`)
        .should("have.attr", "href", href)
        .and("have.attr", "target", "_blank");
    });
  });

  it("provides accessible labels for each social icon", () => {
    SOCIAL_PROFILES.forEach(({ id, label }) => {
      cy.get(`[data-cy=footer-social-link-${id}]`)
        .should("have.attr", "title", label)
        .find("img")
        .should("have.attr", "alt", label);
    });
  });
});
