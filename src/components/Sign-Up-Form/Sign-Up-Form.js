import "./Sign-Up-Form.css"

// Coded By Joseph Choi

const LearnersSignUpForm = () => {
    return (
        <form className="learner-form" action="/personalprofile">
            <div className="basic-info">
                <label>Full Name*</label>
                <input type="text" required />
                <label>Email*</label>
                <input type="text" required />
                <label>Country*</label>
                <input type="text" required />
                <label>State/Province*</label>
                <input type="text" required />
                <label>Type of Account*</label>
                <select placeholder="Choose account type">
                    <option value="learner">Student/Learner</option>
                    <option value="educator">Educator</option>
                    <option value="administrator">Administrator</option>
                </select>
            </div>
            <div className="school-info">
                <label>School</label>
                <select>
                    <option value="waterloo">University of Waterloo</option>
                    <option value="toronto">University of Toronto</option>
                </select>
            </div>
            <button type="submit">Create Account</button>
        </form>
    );
}

export default LearnersSignUpForm;