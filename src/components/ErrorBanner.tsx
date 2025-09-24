interface Props {
  message: string;
}
export default function ErrorBanner({ message }: Props) {
  return (
    <p className="text-yellow-300 font-semibold drop-shadow-[0_2px_0_#000]">
      {message}
    </p>
  );
}
