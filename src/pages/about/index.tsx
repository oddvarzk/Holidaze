export function About() {
  return (
    <div className="py-5 mx-auto">
      <h1 className="text-center text-tiner font-Playfair text-3xl mt-5">
        About us
      </h1>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <h1 className="font-Playfair text-2xl text-charcoal">
            Our mission, to make dream getaways accessible
          </h1>
          <img></img>
        </div>
        <div>
          <p className="font-Montserrat font-light">
            At Holidaze, our mission is simple: to connect people with
            unforgettable venues. Whether it's a serene seaside retreat, a cozy
            cabin in the woods, or a luxurious urban suite, we make it easy for
            you to find and book the perfect place for your getaway.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
