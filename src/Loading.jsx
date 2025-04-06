import PuffLoader from 'react-spinners/PuffLoader';

export function Loading() {
  return (
    <div className="loading">
      <PuffLoader color="#00c2ff" loading size={100} speedMultiplier={1} />
    </div>
  );
}
