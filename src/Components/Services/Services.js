import {
	getArticlesAction,
	getArticleAction,
	changeCurrentPageAction,
	createNewUserAction,
	userErrorsAction,
	logInAction,
	logOutAction,
	editProfileAction,
	addTagAction,
	delTagAction,
	changeTagInputAction,
	createArticleAction,
	changeArticleTagInputAction,
	addTagEditAction,
	delTagEditAction,
	editArticleAction,
	deleteModuleToggleAction,
	deleteArticleAction,
	favoriteAction,
	unFavoriteAction,
} from "../../actions";

export const getArticles = (offset) =>
	async function (dispatch) {
		const result = await fetch(
			`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`,
			{
				headers: {
					"Content-Type": "application/json;charset=utf-8",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);

		const articles = await result.json();

		return dispatch(getArticlesAction(articles));
	};

export const getArticle = (slug) =>
	async function (dispatch) {
		const result = await fetch(
			`https://blog.kata.academy/api/articles/${slug}`,
			{
				headers: {
					"Content-Type": "application/json;charset=utf-8",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);

		const articles = await result.json();

		return dispatch(getArticleAction(articles));
	};

export const changeCurrentPage = (current) =>
	function (dispatch) {
		return dispatch(changeCurrentPageAction(current));
	};

export const createNewUser = (user) =>
	async function (dispatch) {
		let result = await fetch("https://blog.kata.academy/api/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify(user),
		});

		if (!result.ok) {
			result = await result.json();
			return dispatch(userErrorsAction(result.errors));
		}
		if (result.ok) {
			const data = await result.json();
			localStorage.setItem("password", user.user.password);
			localStorage.setItem("email", data.user.email);
			localStorage.setItem("token", data.user.token);
			history.back();
			return dispatch(createNewUserAction(data));
		}
	};

export const logIn = (user) =>
	async function (dispatch) {
		let result = await fetch("https://blog.kata.academy/api/users/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify(user),
		});

		if (!result.ok) {
			result = await result.json();
			return dispatch(userErrorsAction(result.errors));
		}
		if (result.ok) {
			const data = await result.json();
			localStorage.setItem("password", user.user.password);
			localStorage.setItem("email", data.user.email);
			localStorage.setItem("token", data.user.token);
			history.back();
			return dispatch(logInAction(data));
		}
	};

export const logOut = () =>
	function (dispatch) {
		localStorage.clear();
		return dispatch(logOutAction());
	};

export const editProfile = (user) =>
	async function (dispatch) {
		let result = await fetch("https://blog.kata.academy/api/user", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Authorization: `Bearer ${user.user.token}`,
			},
			body: JSON.stringify(user),
		});

		if (!result.ok) {
			result = await result.json();
			return dispatch(userErrorsAction(result.errors));
		}
		if (result.ok) {
			const data = await result.json();
			console.log(data);
			localStorage.setItem("password", user.user.password);
			localStorage.setItem("email", data.user.email);
			return dispatch(editProfileAction(data));
		}
	};

export const changeTagInput = (data) =>
	function (dispatch) {
		return dispatch(changeTagInputAction(data));
	};

export const addTag = (tag) =>
	function (dispatch) {
		return dispatch(addTagAction(tag));
	};

export const delTag = (index) =>
	function (dispatch) {
		return dispatch(delTagAction(index));
	};

export const createArticle = (data) =>
	async function (dispatch) {
		let result = await fetch("https://blog.kata.academy/api/articles", {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Authorization: `Bearer ${data.article.token}`,
			},
			body: JSON.stringify(data),
		});

		if (!result.ok) {
			result = await result.json();
			console.log(result);
			return dispatch(userErrorsAction(result.errors));
		}
		if (result.ok) {
			const data = await result.json();
			return dispatch(createArticleAction(data));
		}
	};

export const changeArticleTagInput = (data, index) =>
	function (dispatch) {
		return dispatch(changeArticleTagInputAction(data, index));
	};

export const addTagEdit = (data) =>
	function (dispatch) {
		return dispatch(addTagEditAction(data));
	};

export const delTagEdit = (index) =>
	function (dispatch) {
		return dispatch(delTagEditAction(index));
	};

export const editArticle = (data, slug) =>
	async function (dispatch) {
		console.log(data.article.token);
		let result = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Authorization: `Bearer ${data.article.token}`,
			},
			body: JSON.stringify(data),
		});

		if (!result.ok) {
			result = await result.json();
			console.log(result);
			return dispatch(userErrorsAction(result.errors));
		}
		if (result.ok) {
			const data = await result.json();
			return dispatch(editArticleAction(data));
		}
	};

export const deleteModuleToggle = () =>
	function (dispatch) {
		return dispatch(deleteModuleToggleAction());
	};

export const deleteArticle = (token, slug) =>
	async function (dispatch) {
		let result = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!result.ok) {
			result = await result.json();
			return dispatch(userErrorsAction(result.errors));
		}
		if (result.ok) {
			return dispatch(deleteArticleAction());
		}
	};

export const favorite = (token, slug) =>
	async function (dispatch) {
		let result = await fetch(
			`https://blog.kata.academy/api/articles/${slug}/favorite`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!result.ok) {
			result = await result.json();
			return dispatch(userErrorsAction(result.errors));
		}
		if (result.ok) {
			const data = await result.json();
			return dispatch(favoriteAction(data));
		}
	};

export const unFavorite = (token, slug) =>
	async function (dispatch) {
		let result = await fetch(
			`https://blog.kata.academy/api/articles/${slug}/favorite`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!result.ok) {
			result = await result.json();
			return dispatch(userErrorsAction(result.errors));
		}
		if (result.ok) {
			const data = await result.json();
			return dispatch(unFavoriteAction(data));
		}
	};
