function LabeledIcon({ className, icon, label }) {
  return (
    <div className={`${className} flex gap-1 items-center`}>
      {icon}
      <span className="text-white text-sm font-medium">{label}</span>
    </div>
  );
}

export default LabeledIcon;
