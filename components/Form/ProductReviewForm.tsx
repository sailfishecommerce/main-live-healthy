/* eslint-disable no-nested-ternary */
import productReviewForm from '@/json/product-review-form.json'

export default function ProductReviewForm() {
  return (
    <div className="col-md-5 mt-2 pt-4 mt-md-0 pt-md-0">
      <div className="bg-secondary py-grid-gutter px-grid-gutter rounded-3">
        <h3 className="h4 pb-2">Write a review</h3>
        <form noValidate className="needs-validation">
          {productReviewForm.map((formInput) => (
            <div key={formInput.label} className="mb-3">
              <label className="form-label" htmlFor={formInput.id}>
                {formInput.label}
                <span className="text-danger">*</span>
              </label>
              {formInput.type === 'input' ? (
                <input
                  required
                  className="form-control"
                  type={formInput.inputType}
                  placeholder={formInput.placeholder}
                  id={formInput.id}
                />
              ) : formInput.type === 'select' ? (
                <select required className="form-select" id="review-rating">
                  <option value="">Choose rating</option>
                  {formInput.options?.map((option) => (
                    <option key={option} value={option}>
                      {option} stars
                    </option>
                  ))}
                </select>
              ) : (
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder={formInput.placeholder}
                  id={formInput.id}
                ></textarea>
              )}
              <div className="invalid-feedback">field must not be empty!</div>
              <small className="form-text text-gray-500">
                {formInput.helperText}
              </small>
            </div>
          ))}
          <button
            aria-label="Submit Review"
            className="btn btn-primary btn-shadow d-block w-100"
            type="button"
          >
            Submit a Review
          </button>
        </form>
      </div>
    </div>
  )
}
