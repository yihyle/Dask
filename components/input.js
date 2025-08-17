export default function Input({ label, name, type = "text", required = false }) {
  return (
    <div className="w-full h-[70px] flex flex-col justify-center mb-4">
      <p className="text-[14px] text-black/70 mb-1">{label}</p>
      <input
        type={type}
        name={name}
        className="w-full h-[47px] rounded-[10px] bg-white border border-[#D7D7D7] focus:outline-none focus:border-[#05AA87] pl-4 pr-4"
        required={required}
      />
    </div>
  );
}