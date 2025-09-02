export default function Input({ 
  label, 
  name, 
  type = "text", 
  required = false, 
  value, 
  onChange 
}) {
  return (
    <div className="w-full h-[70px] flex flex-col justify-center mb-4">
      <p className="text-[14px] text-black/70 dark:text-white/70 mb-1">{label}</p>
      <input type={type} name={name} value={value} onChange={onChange} className="w-full h-[47px] rounded-[10px] bg-white dark:bg-[#1E1E1E] border border-[#D7D7D7] dark:border-[#2A2A2A] text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 focus:outline-none focus:border-[#05AA87] pl-4 pr-4" required={required}/>
    </div>
  );
}