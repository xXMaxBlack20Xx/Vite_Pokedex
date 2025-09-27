interface Props {
  message: string;
}

export default function ErrorBanner({ message }: Props) {
  return (
    <p className="min-w-screen text-4xl text-center text-yellow-400 font-semibold drop-shadow-[0_2px_0_#000]">
      {message}
    </p>
  );
}