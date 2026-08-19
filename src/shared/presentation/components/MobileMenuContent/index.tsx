import MenuNav from "../MenuNav";
import Switcher from "../Switcher";

type Props = {
  onButtonClick?: () => void;
};
export default function MobileMenuContent({ onButtonClick }: Props) {
  return (
    <section
      data-cy="mobile-menu-content-container"
      className="flex flex-col gap-4 items-center"
    >
      <nav data-cy="mobile-menu-nav-container">
        <MenuNav onButtonClick={onButtonClick} />
      </nav>
      <div data-cy="mobile-menu-switcher-container">
        <Switcher onButtonClick={onButtonClick} />
      </div>
    </section>
  );
}
