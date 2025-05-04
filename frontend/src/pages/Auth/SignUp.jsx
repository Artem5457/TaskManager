import { useState } from 'react';
import { AuthLayout } from '../../components/layouts/AuthLayout.jsx';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector.jsx';
import { Input } from '../../components/Inputs/Input.jsx';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/helper.js';

export const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    password: "",
    adminInviteToken: ""
  });
  const [error, setError] = useState(null);

  // Handle SignUp Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    const { fullName, email, password } = signupForm;

    if (!fullName) {
      setError("Please enter full name");
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    } else {
      setError(validatePassword(password));
      if (error) return;
    }

    // Login API Call

  }

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={signupForm.fullName}
              onChange={({ target }) => setSignupForm({ ...signupForm, fullName: target.value })}
              label="Full Name"
              placeholder="John"
              type="text"
            />
            <Input
              value={signupForm.email}
              onChange={({ target }) => setSignupForm({ ...signupForm, email: target.value })}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />
            <Input
              value={signupForm.password}
              onChange={({ target }) => setSignupForm({ ...signupForm, password: target.value })}
              label="Password"
              placeholder="Min 8 Characters"
              type="password"
            />
            <Input
              value={signupForm.adminInviteToken}
              onChange={({ target }) => setSignupForm({
                ...signupForm,
                adminInviteToken: target.value
              })}
              label="Admin Invite Token"
              placeholder="6 Digit Code"
              type="text"
            />
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            SIGN UP
          </button>

          <p>
            Already an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};
