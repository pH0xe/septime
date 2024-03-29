import { Notify } from 'quasar';
import { db, storage } from '../boot/firebase';
import { NewsType } from '../js/newsType';

export default {
  state: {
    allNews: [],
    news: [],
    usefulInfo: [],
    ffeInfo: [],
    clubStore: []
  },

  mutations: {
    setNews(state, { news }) {
      state.allNews = news;
      state.news = news.filter((n) => n.type === NewsType.NEWS);
      state.usefulInfo = news.filter((n) => n.type === NewsType.USEFUL);
      state.clubStore = news.filter((n) => n.type === NewsType.STORE);
      state.ffeInfo = news.filter((n) => n.type === NewsType.FFE);
    },

    updateNewsState(state, {
      news, title, text, type
    }) {
      const index = state.allNews.indexOf(news);
      state.allNews[index].title = title;
      state.allNews[index].text = text;
      state.allNews[index].type = type;
    },

    deleteNewsState(state, { news }) {
      const index = state.news.indexOf(news);
      delete state.news[index];
    },

    createNewsState(state, { news }) {
      state.news = [...state.news, news];
      return news.uid;
    }
  },

  actions: {
    fetchNews({ commit }) {
      db.collection('news').get()
        .then((querySnapshot) => {
          const collector = [];
          querySnapshot.forEach((doc) => {
            collector.push({ uid: doc.id, ...doc.data() });
          });
          return collector;
        })
        .then((news) => news.map((item) => {
          item.date = item.date.toDate();
          return item;
        }))
        .then((news) => Promise.all(news.map(async (item) => {
          try {
            item.imgURL = await storage.ref()
              .child('news')
              .child(item.uid)
              .getDownloadURL();
          } catch (_e) {
            // Ignore
          }
          return item;
        })))
        .then((news) => {
          commit('setNews', { news });
        })
        .catch((err) => {
          console.error('Error while fetching news list : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'bottom'
          });
        });
    },

    updateNews({ commit }, {
      news, newTitle, newText, newType
    }) {
      return db.collection('news').doc(news.uid)
        .update({ title: newTitle, text: newText, type: newType })
        .then(() => {
          commit('updateNewsState', {
            news, title: newTitle, text: newText, type: newType
          });
        })
        .catch((err) => {
          console.log('Error while updating news : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    deleteNews({ commit }, { news }) {
      db.collection('news').doc(news.uid)
        .delete()
        .then(() => {
          storage.ref().child(`news/${news.uid}`).delete();
        })
        .then(() => {
          commit('deleteNewsState', { news });
        })
        .catch((err) => {
          console.log('Error while deleting news : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    createNews({ commit }, { news }) {
      return db.collection('news')
        .add(news)
        .then((docReference) => {
          news.uid = docReference.id;
          commit('createNewsState', { news });
          return docReference.id;
        })
        .catch((err) => {
          console.log('Error while creating news : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'top-left'
          });
        });
    },

    // eslint-disable-next-line no-unused-vars
    updateNewsImage({ commit }, { news }) {
      storage.ref()
        .child('news')
        .child(news.uid)
        .delete();
    }
  }
};
