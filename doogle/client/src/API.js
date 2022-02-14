import Category from "./Category";
import PostElement from "./components/PostElement";

const url = 'http://localhost:3000/api';
const imageUrl = 'http://localhost:3000/static/'

async function getCategories() {
    const response = await fetch(url + '/kats');
    if (response.ok) {
        const categories = await response.json();
        return categories.map(c => new Category(c.ID, c.name, imageUrl + c.image))
    }
    return [];
}

async function getAllCategories() {
    const response = await fetch(url + '/allkats');
    if (response.ok) {
        const categories = await response.json();
        console.log("fromAPI", categories)
        return categories.map(c => new Category(c.ID, c.name.toLowerCase(), imageUrl + c.image, c.catID, c.esse))
    }
    return [];
}

async function getCategoryFromSubcategory(catID) {
    const response = await fetch(url + '/kat/' + catID);
    if (response.ok) {
        let category = await response.json();
        category = new Category(category.ID, category.name, imageUrl + category.image)
        return category;
    }
    return undefined;
}

async function getSubcategories(activeCategory) {
    const response = await fetch(url + '/skats/' + activeCategory);
    if (response.ok) {
        const categories = await response.json();
        return categories.map(c => new Category(c.ID, c.name, imageUrl + c.image, c.catID, c.esse))
    }
    return [];
}

async function getCategoriesAndSubcategories() {
    const response = await fetch(url + '/allkats');
    if (response.ok) {
        const categories = await response.json();
        return categories.map(c => new Category(c.ID, c.name, imageUrl + c.image))
    }
    return [];
}

async function getGuideTextAndImage(activeSubcategory) {
    const response = await fetch(url + '/guide/' + activeSubcategory);
    if (response.ok) {
        let t = await response.json();
        t.imagepost = imageUrl + t.imagepost;
        return t;
    }
    return undefined;
}

async function getUserInfo(userId) {
    const response = await fetch(url + '/user/' + userId);
    if (response.ok) {
        let user = await response.json();
        user.icon = imageUrl + user.icon;
        return user;
    }
    return undefined;
}

async function getAllPosts(filter) {
    const response = await fetch(url + '/forum/' + filter);
    if (response.ok) {
        const posts = await response.json();
        return posts.map(p => new PostElement(p.ID, p.author, p.text.toLowerCase(), p.likes, p.dislikes, p.ups, p.comments))
    }
    return [];
}
async function getTagsForOnePost(postID) {
    const response = await fetch(url + '/tags/' + postID);
    if (response.ok) {
        const tags = await response.json();
        return tags;
    }
    return [];

}

async function addNewComment(comment) {
    const res1 = await fetch(url + '/addComment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "postID": comment.postID,
            "userID": comment.userID,
            "text": comment.text

        })
    });
    if (res1.ok) {
        return true
    }
}

async function ModifyPost(post) {
    const res1 = await fetch(url + '/modifyPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ID": post.ID,
            "author": post.author,
            "text": post.text,
            "tags": post.tags
        })
    });

    if (res1.ok) {
        return true
    } else { console.log(res1) }
}

async function logUser(id) {
    const res1 = await fetch(url + '/log/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res1.ok) {
        return true
    } else { console.log(res1) }
}

async function addNewPost(post) {
    const res1 = await fetch(url + '/addPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "author": post.author,
            "text": post.text,
            "tags": post.tags
        })
    });
    if (res1.ok) {
        return true
    }
}

async function modifyComment(commentID, text) {
    const res1 = await fetch(url + '/modifyComment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ID": commentID,
            "text": text,
        })
    });

    if (res1.ok) {
        return true
    } else { console.log(res1) }
}

async function getAllTags() {
    const response = await fetch(url + '/tags');
    if (response.ok) {
        const tags = await response.json();
        return tags;
    }
    return [];

}

async function DeletePostById(id) {
    const res = await fetch(url + `/killpost/` + id, {
        method: 'DELETE'
    });
    if (res.ok) {
        return undefined
    }
}

async function DeleteCommentById(commentid, postid) {
    const res = await fetch(url + `/killcomment/` + commentid + `/` + postid, {
        method: 'DELETE'
    });
    if (res.ok) {
        return undefined
    }
}

async function addNewAssociate(value) {
    const res1 = await fetch(url + '/associate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            VAL: value.VAL,
            userID: value.userID,
            postID: value.postID
        })
    });
    if (res1.ok) {
        return true
    }
}

async function DeleteAssociate(ass, id, postid) {

    const res = await fetch(url + `/` + ass + `/kill` + id + `/` + postid, {
        method: 'DELETE'
    });
    if (res.ok) {
        return undefined
    }
}

async function getLikesForOneUser(userID) {
    const response = await fetch(url + '/liked/' + userID);
    if (response.ok) {
        const likes = await response.json();
        const returnlikes = likes.map(element => {
            return { ID: element.ID, userID: parseInt(element.userID), postID: element.postID }
        });
        return returnlikes;
    }
    return [];

}

async function getDislikesForOneUser(userID) {
    const response = await fetch(url + '/disliked/' + userID);
    if (response.ok) {
        const dislikes = await response.json();
        const returndislikes = dislikes.map(element => {
            return { ID: element.ID, userID: parseInt(element.userID), postID: element.postID }
        });
        return returndislikes;
    }
    return [];

}

async function getUpsForOneUser(userID) {
    const response = await fetch(url + '/upped/' + userID);
    if (response.ok) {
        const ups = await response.json();
        const returnups = ups.map(element => {
            return { ID: element.ID, userID: parseInt(element.userID), postID: element.postID }
        });
        return returnups;
    }
    return [];

}

async function getSavedForOneUser(userID) {
    const response = await fetch(url + '/saved/' + userID);
    if (response.ok) {
        const saved = await response.json();
        const returnsaved = saved.map(element => {
            return { ID: element.ID, userID: parseInt(element.userID), postID: element.postID }
        });
        return returnsaved;
    }
    return [];
}

async function getSavedInfo(userID) {
    const response = await fetch(url + '/savedInfo/' + userID);
    if (response.ok) {
        const saved = await response.json();
        return saved.map(p => new PostElement(p.postID, p.author, p.text.toLowerCase(), p.likes, p.dislikes, p.ups, p.comments))
    }
    return [];
}

async function getMine(userID) {
    const response = await fetch(url + '/mine/' + userID);
    if (response.ok) {
        const saved = await response.json();
        return saved.map(p => new PostElement(p.ID, p.author, p.text.toLowerCase(), p.likes, p.dislikes, p.ups, p.comments))
    }
    return [];
}

async function getCommentsForOnePost(postID) {
    const response = await fetch(url + '/comments/' + postID);
    if (response.ok) {

        const comments = await response.json();
        return comments;
    }
    return [];

}


const API = {
    getCategories, getSubcategories, getGuideTextAndImage, getUserInfo,
    getCategoriesAndSubcategories, getAllPosts, getTagsForOnePost, addNewPost,
    getAllTags, DeletePostById, addNewAssociate, DeleteAssociate, getLikesForOneUser,
    getDislikesForOneUser, getUpsForOneUser, getCommentsForOnePost, ModifyPost,
    addNewComment, logUser, DeleteCommentById, getSavedForOneUser, getAllCategories, getCategoryFromSubcategory, modifyComment, getSavedInfo, getMine
};
export default API;