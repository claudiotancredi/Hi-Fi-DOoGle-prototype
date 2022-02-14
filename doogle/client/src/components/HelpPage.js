import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import PersonalizedNavbarProfile from './PersonalizedNavbarProfile';
import ProfileFavoriteHeaderCopy from "./FavoriteHeader";
import uparrow from '../myicons/up-arrow.png'

function HelpPage(props) {

    return (<>
        <ProfileFavoriteHeaderCopy
            md={props.md}
            fromHome={props.fromHome}
            setGoToHome={props.setGoToHome} setGoToProfile={props.setGoToProfile}
            setGoToGuide={props.setGoToGuide} setGoToForum={props.setGoToForum}
            setFromHome={props.setFromHome}
            t={"Help"}
            setMyPosts={props.setMyPosts}
            setFavorites={props.setFavorites}
            setmd={props.setmd} />
        <Card className="guidepage2">
            <Card.Body>
                    <div className="guide-post-text">
                        <p>DOoGle app's ambitious goal is to assist both novice and experienced dog owners that need help in taking care of their dogs' needs.</p>
                        <p>This help will provide you with some useful information about the different pages that you can explore in this application and their features.</p>
                        <p>We hope that you will find this information useful, so that you can fully use the functionalities of our DOoGle app! Enjoy your time taking care of your little friend!</p>
                        <h3>The Home</h3>
                        <p>Inside the Home page you will find five shortcuts, links to some of the most useful functionalities of the application:
                        </p>
                        <ul>
                                <li>"Essentials guide articles", to immediately see what are the most important articles to read for novice dog owners;</li>
                                <li>"New post", to reach a page that will provide you the tools to create a post on the forum and share your knowledge, experiences or doubts;</li>
                                <li>"Experts' posts", a shortcut to see only expert posts on the forum that can be useful to quickly access some reliable suggestions;</li>
                                <li>"Most upped posts", to see a ranking of the Forum posts based on how many "Ups" the posts have received;</li>
                                <li>"Favorite posts", to quicly access the posts that you saved, so that you can check them whenever you want.</li>
                            </ul>
                        <h3>The Guide</h3>
                        <p>The Guide page offers basic knowledge about different topics that all dog owners should be aware of.</p>
                        <p>It is organized in Categories, to help you in navigating and finding the right information at the right moment.<br></br>
                            You can also use a search functionality to immediately find the topic you are interested in!</p>
                        <p>One interesting feature is the Essentials category, which contains some important articles that might help novice dog owners.</p>
                        <p>Moreover, each Guide article contains a link that will bring you to the Forum page, showing posts that are related to the topic you were reading in the Guide.</p>

                        <h3>The Forum</h3>
                        <p>The Forum page allows users to interact with each other, by creating posts, by leaving reactions and/or comments.</p>
                        <p>In this section, a special emphasis is given to expert contributions, which should prove to be more helpful. Do you know what an "Up" <img
                            alt=""
                            src={uparrow}
                            width="14"
                            height="14"
                        /> is? It's a special like that only experts can leave! In addition to this, the posts created by Expert users
                            will be highlighted with a special badge, so that they can be immediately recognized.
                            You can also apply the "Expert" filter to see only those posts!</p>
                        <p>You can find specific posts regarding a topic you're interested in by applying some filters or, alternatively, you can
                            directly search for a specific word inside the text of the posts by using the search bar!<br></br>
                            If you filter the posts by choosing multiple Tags (beware, for categories!), you will see the posts that contain one of those Tags
                            (e.g. by applying the "Food" and "Toys" tags, the posts with the tag "Food" and the posts with the tag "Toys" will be shown).<br></br>
                            Each time you apply a filter for a Tag, the corresponding Subtags will become available for selection as well
                            (with the same hierarchy of the Articles and their corresponding Category in the Guide page).
                            By selecting a Subtag, you will furhter filter the posts that already have the corresponding Tag
                            (e.g. by selecting the "Kibble" and "Balls" Subtags after "Food" and "Toys" were selected, the posts with both the tags "Food" and "Kibble" and the posts with both the tags "Toys" and "Balls" will be shown).<br></br>
                            In this way you can see posts about more than one topic that you're interested in, at the same time!<br></br>
                            The tags "Expert" and "Question/Advice" will be added to all your selected tags (e.g. by selecting "Advice", "Food", "Kibble", "Toys" and "Balls" you
                            will see both posts tagged as Advice-Food-Kibble and Advice-Toys-Balls).</p>
                        
                        <h3>The Profile</h3>
                        <p>The Profile page will provide you with some easy ways to access the posts that you personally created ("My posts") and your favorite posts, that you marked as saved in the Forum page ("Favorite posts").</p>
                        <p>An easy and quick access to your favorite posts can be helpful when you want to read them a second time, right when you think they will prove useful.</p>
                        <i>Enjoy!</i><br></br><br></br>
                        <i>  &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;                     DOoGle team</i>

                    </div>
            </Card.Body>
        </Card>
        <PersonalizedNavbarProfile
            setFromHome={props.setFromHome}
            setGoToHome={props.setGoToHome}
            setGoToProfile={props.setGoToProfile}
            setGoToGuide={props.setGoToGuide}
            setGoToForum={props.setGoToForum}
            currentPage={"profile"}
            setmd={props.setmd}
            setMyPosts={props.setMyPosts}
            setFavorites={props.setFavorites}
        />
    </>)
}

export default HelpPage;