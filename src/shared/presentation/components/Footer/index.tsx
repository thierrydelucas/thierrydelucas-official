import React from "react";
import SocialMediaContainer from "../SocialMediaContainer";
import EmailAddressComponent from "../EmailAddressComponent";

/**
 * Reusable Footer component that displays a set of social media icons.
 *
 * This component can be used on any page of the site to show social media icons,
 * redirecting users to the respective external profiles.
 *
 * @component
 * @example
 * <Footer />
 */

export default function Footer(): React.JSX.Element {
  return (
    <section
      data-cy="footer"
      className="flex flex-col gap-4 w-full py-6 px-8 items-center justify-center border-t border-gray-500/10"
    >
      <SocialMediaContainer />

      <EmailAddressComponent />

      <p
        data-cy="footer-copyright"
        className="text-white opacity-60 font-inter text-[8px] md:text-[10px] font-normal tracking-[2%]"
      >
        © 2026 Thierry de Lucas. All rights reserved.
      </p>
    </section>
  );
}
