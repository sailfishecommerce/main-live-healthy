export function ProductColorOption({
  option,
  optionHandler,
  formBg,
  product,
}: any) {
  return (
    <div key={option.id}>
      <div className="fs-sm mb-4 flex items-center">
        <span className="text-heading fw-medium me-1">Color:</span>
        <span className="text-gray-500 flex items-center" id="colorOptionText">
          {option?.values?.map((value: any, index: number) => {
            return option.values.length - 1 === index ? (
              <div key={value.id}>{value.name}</div>
            ) : (
              <div key={value.id}>
                {value.name} <span className="mx-1">/</span>
              </div>
            );
          })}
        </span>
      </div>
      <div className="position-relative me-n4 mb-3">
        {option?.name === "Color" &&
          option?.values.map((value: any) => (
            <div
              key={value.id}
              className="form-check form-option form-check-inline mb-2"
            >
              <input
                className="form-check-input ms-1"
                type="radio"
                name={option.name}
                id={value.id}
                onChange={optionHandler}
                value={value.name}
                required
              />
              <label
                className="form-option-label rounded-circle"
                htmlFor={value.id}
              >
                <span
                  className="form-option-color rounded-circle"
                  style={formBg(value.name)}
                ></span>
              </label>
            </div>
          ))}
        {product.price && (
          <div className="product-badge product-available mt-n1">
            <i className="ci-security-check"></i>
            Product available
          </div>
        )}
      </div>
    </div>
  );
}
