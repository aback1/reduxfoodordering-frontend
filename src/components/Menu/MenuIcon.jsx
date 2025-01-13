export default function MenuIcon({ title, name }) {
  return (
    <img
      src={`/src/assets/${title}/${name}.jpg`}
      alt={`${name}`}
      className="w-32 h-32 object-cover rounded-lg shadow-md"
    />
  );
}
