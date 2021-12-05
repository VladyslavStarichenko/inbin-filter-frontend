// Modules
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import cx from 'classnames';

// Styles
import './styles.scss';

function ContactUs() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = useCallback((data) => {
    console.log(JSON.stringify(data));
  }, []);

  return (
    <div className="contact-us-common-wapper">
      <div className="text-container">
        <h2 className="contact-us-text">CONTACT US</h2>
        <span className="write-us-message">Write us a message</span>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="email-phone-outer-wrapper">
            <div>
              <input
                className={cx("email-input", { error: errors.email?.type ===  "required" || errors.email?.type === "pattern"})}
                type="email"
                placeholder="Email"
                {...register("email", { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
              />
              {errors.email?.type ===  "required" && <span className="email-error">Email is a required field.</span>}
              {errors.email?.type === "pattern" && <span className="email-error">Email should be in a right format.</span>}
            </div>
            <div>
              <input
                className={cx("phone-input", { error: errors.phone?.type ===  "required" || errors.phone?.type === "pattern"})}
                type="text"
                placeholder="Phone"
                {...register("phone", { required: true, maxLength: 20, minLength: 7 })}
              />
              {(errors.phone?.type ===  "required" && <span className="phone-error">Phone is a required field.</span>) ||
              (errors.email?.type === "pattern" && <span className="phone-error">Phone should be in a right format.</span>) ||
              (errors.email?.type === "minLength" && <span className="phone-error">Minimal length is 7.</span>)
              }
            </div>
          </div>
          <div className="message-submit-container">
            <textarea
              type="text"
              placeholder="Message"
              className={cx({"error": errors.message?.type ===  "required"})}
              {...register("message", { required: true, minLength: 5, maxLength: 500 })}
            />
            {errors.message?.type ===  "required" && <span className="message-error">Message is a required field.</span>}
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
