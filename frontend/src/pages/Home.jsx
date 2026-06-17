import React from "react"
import CardImage from "../assets/Untitled design (59).png"

export default function Home() {
    return (
        <div className="home-container">
            <h1>Discover Ideas Worth Reading</h1>
            <section>
                <article>
                    <p>Welcome to a community where stories, insights, and creativity come together. Explore articles from passionate writers, discover fresh perspectives, and stay informed on topics that matter to you.</p>
                </article>
            </section>
            <section>
                <article>
                    <p>Whether you're looking for inspiration, practical knowledge, or thought-provoking discussions, you'll find content created by people who love to share their experiences and expertise.</p>
                </article>
            </section>
            <section id="ul">
                <article>
                    <ul>Join today to unlock the full experience:
                        <li>Follow your favorite authors</li>
                        <li>Save articles for later</li>
                        <li>Share your thoughts through comments</li>
                        <li>Publish your own stories and reach a wider audience</li>
                    </ul>
                </article>
            </section>
            <h2>Start your journey with us and become part of a growing community of readers and writers.</h2>
            <h3>Ready to Share Your Story?</h3>
            <p>Thousands of readers are waiting to discover fresh perspectives and valuable insights. Create your account today and start publishing in minutes.</p>
        </div>
    )
}