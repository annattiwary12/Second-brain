import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const LandingPage = () => {
  const navigate = useNavigate();

  const redirectToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="h-screen bg-bg-main flex flex-col items-center justify-center px-6 text-center">
  {/* App Title */}
  <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-text-primary leading-tight mb-6">
    Welcome to <span className="text-bg-primaryBtn">Brainly</span>
  </h1>

  {/* Subtitle */}
  <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mb-10 leading-relaxed">
    Capture your ideas, store important content, and create your second brain with Brainly. Seamlessly gather, organize, and retrieve information, and share your knowledge with anyone across the globe!
  </p>

  {/* Call-to-Action Button */}
  <Button
    name="Get Started"
    type="primary"
    size="lg"
    onClickHandler={redirectToDashboard}
  />
</div>

  );
};

export default LandingPage;
