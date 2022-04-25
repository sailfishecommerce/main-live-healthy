import aboutUsContent from "@/json/about-us.json";
import { TextArea, Input } from "@/components/Form/FormFields";

export default function AboutusForm() {
  return (
    <section className="row g-0">
      <div className="section-bg col-md-6 bg-position-center bg-size-cover bg-secondary order-md-2"></div>
      <div className="col-md-6 px-3 px-md-5 py-5 order-md-1">
        <div className="text-content mx-auto py-lg-5">
          <h2 className="h3 mb-2">We are hiring new talents</h2>
          <p className="fs-sm text-gray-500 pb-2">
            If you want to be part of our team please submit you CV using the
            form below:
          </p>
          <form className="needs-validation row g-4" method="post" noValidate>
            {aboutUsContent.form.map((formContent, index) => {
              formContent.type === "textarea" ? (
                <TextArea key={index} formContent={formContent} />
              ) : (
                <Input key={index} formContent={formContent} />
              );
            })}
            <div className="col-12">
              <button
                aria-label="submit cv"
                className="btn btn-info btn-shadow"
                type="submit"
              >
                Submit your CV
              </button>
            </div>
          </form>
        </div>
      </div>
      <style jsx>
        {`
          .section-bg {
            min-height: 15rem;
            background-image: url(""/img/about/03.webp");
          }
          .text-content {
            max-width: 35rem;
          }
        `}
      </style>
    </section>
  );
}
