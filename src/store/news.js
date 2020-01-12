import { Notify } from 'quasar';
import { db, storage } from '../boot/firebase';

export default {
  state: {
    news: []
  },

  mutations: {
    setNews(state, { news }) {
      state.news = news;
    },

    updateNewsState(state, { news, title, text }) {
      const index = state.news.indexOf(news);
      state.news[index].title = title;
      state.news[index].text = text;
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
          console.log('Error while fetching news list : ', err);
          Notify.create({
            message: `Une erreur s'est produite: ${err}`,
            color: 'negative',
            position: 'bottom'
          });
        });
    },

    updateNews({ commit }, { news, newTitle, newText }) {
      db.collection('news').doc(news.uid)
        .update({ title: newTitle, text: newText })
        .then(() => {
          commit('updateNewsState', { news, title: newTitle, text: newText });
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
    }
  }
};
