import { NextIntlClientProvider } from "next-intl";
import MenuNav from "@/src/shared/presentation/components/MenuNav";
import messages from "@/messages/en.json";

const NAV_LINKS = [
  { name: "home", href: "/en/home", label: "Home" },
  { name: "biography", href: "/en/biography", label: "Biography" },
  { name: "schedule", href: "/en/schedule", label: "Schedule" },
  { name: "discography", href: "/en/discography", label: "Discography" },
  { name: "media", href: "/en/media", label: "Media" },
  { name: "contact", href: "/en/contact", label: "Contact" },
] as const;

describe("MenuNav", () => {
  beforeEach(() => {
    cy.mount(
      <NextIntlClientProvider locale="en" messages={messages}>
        <MenuNav />
      </NextIntlClientProvider>,
    );
  });

  it("renders locale-prefixed hrefs for every page", () => {
    NAV_LINKS.forEach(({ name, href, label }) => {
      cy.get(`[data-cy=menu-nav-link-${name}]`)
        .should("be.visible")
        .and("have.attr", "href", href)
        .and("contain.text", label);
    });
  });

  it("closes the mobile drawer immediately without delaying navigation", () => {
    const onButtonClick = cy.stub().as("onButtonClick");

    cy.mount(
      <NextIntlClientProvider locale="en" messages={messages}>
        <MenuNav onButtonClick={onButtonClick} />
      </NextIntlClientProvider>,
    );

    cy.get("[data-cy=menu-nav-link-biography]").click();
    cy.get("@onButtonClick").should("have.been.calledOnce");
  });
});
