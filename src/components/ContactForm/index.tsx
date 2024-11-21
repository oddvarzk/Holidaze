import { useForm } from "react-hook-form";

interface FormValues {
  name: string;
  subject: string;
  email: string;
  body: string;
}

export function ContactForm() {
  const {
    register,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <form noValidate>
      <div>
        <label htmlFor="name" className="">
          Your name
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Your name is required",
              minLength: {
                value: 4,
                message: "Your name must be atleast 3 characters long! No ",
              },
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            })}
          ></input>
        </label>
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name.message}</p>
        )}
        <button className="bg-btns" type="submit">
          Send message
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
