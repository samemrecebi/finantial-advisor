const Circle = ({ size, color, additionalStyles }) => {
    return (
      <div
        className={`${size} ${color} rounded-full flex justify-center items-center ${additionalStyles}`}
      >
        250px Circle
      </div>
    );
  };
  
  export default Circle;
  