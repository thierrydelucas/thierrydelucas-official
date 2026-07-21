interface ButtonProps {
  title: string;
}

export default function Button({ title }: ButtonProps) {
  return (
    <button className="rounded-full border border-white px-10 py-2.5 font-inter text-sm font-medium tracking-wide transition-opacity hover:opacity-60 cursor-pointer text-white/90">
      {title}
    </button>
  );
}
