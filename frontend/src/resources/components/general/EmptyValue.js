function EmptyValue({ className, label }) {
  return (
    <div className={`${className} text-white font-medium text-base`}>
      {label}
    </div>
  );
}

export default EmptyValue;
