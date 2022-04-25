export default function FooterDeals() {
  return (
    <div className="flex flex-col w-full md:mb-4 mb-0 order-1 md:w-1/4">
      <h4 className="font-bold mt-4 mb-2 md:mb-6 text-lg md:text-xl">
        Get deals in your inbox
      </h4>
      <span className="deal-form flex items-cente">
        <input
          placeholder="Enter your e-mail"
          className="bg-transparent border-b-2 border-black w-full"
        />
        <button type="submit" className="mb-0 border-b-2 border-black">
          Join
        </button>
      </span>
    </div>
  );
}
