const TestimonialsCard = ({ item }) => {
  return (
    <div className="w-[380px] h-[250px] rounded-3xl bg-gray-100 p-8 flex flex-col justify-between">
      <p className="text-2xl text-gray-600">"{item.quote}"</p>

      <div className="mt-8 flex items-center gap-3">
        <img
          src={item.image}
          alt={item.name}
          className="h-12 w-12 rounded-full object-cover"
        />

        <div>
          <h4 className="font-medium">{item.name}</h4>
          <p className="text-gray-400 text-sm">{item.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCard;
