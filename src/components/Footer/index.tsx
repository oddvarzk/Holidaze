export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex justify-center bg-tiner h-16 gap-10">
      <div className="flex items-center">
        <p className="font-Metamorphous text-amber-100">
          © {currentYear} Holidaze
        </p>
      </div>
    </div>
  );
}

export default Footer;
