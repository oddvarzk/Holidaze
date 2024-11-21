// import { RegisterData } from "../../../components/api/registerdata/index.tsx";

export function RegisterForm() {
  return (
    <div className="bg-tiner min-h-screen">
      <form className="py-5 container mx-auto">
        <div>
          <h1 className="text-center text-amber-100 font-Playfair text-3xl py-5">
            Register account
          </h1>
          <div className="flex justify-center font-Montserrat gap-5 text-paleSand">
            <p className="py-1">Already have an account?</p>
            <button className="bg-btns px-2 h-8 shadow-xl hover:bg-amber-100 hover:text-charcoal">
              Login here
            </button>
          </div>
        </div>
        <div>{/* Additional form elements here */}</div>
      </form>
    </div>
  );
}

export default RegisterForm;
