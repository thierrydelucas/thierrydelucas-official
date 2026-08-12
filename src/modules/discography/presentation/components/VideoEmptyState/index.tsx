type VideoEmptyStateProps = {
  message: string;
};

export default function VideoEmptyState({ message }: VideoEmptyStateProps) {
  return (
    <p className="py-16 text-center font-inter text-base font-medium tracking-normal text-white/70 md:text-lg">
      {message}
    </p>
  );
}
