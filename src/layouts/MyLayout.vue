<template>
  <QLayout view="lHh Lpr lFf">
    <QHeader elevated>
      <QToolbar>
        <QBtn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <QToolbarTitle>
          Quasar App
        </QToolbarTitle>

        <div>Quasar v{{ $q.version }}</div>
      </QToolbar>
    </QHeader>

    <QDrawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <QList>
        <QItemLabel header>
          Essential Links
        </QItemLabel>
        <QItem
          clickable
          tag="a"
          target="_blank"
          href="https://quasar.dev"
        >
          <QItemSection avatar>
            <QIcon name="school" />
          </QItemSection>
          <QItemSection>
            <QItemLabel>Docs</QItemLabel>
            <QItemLabel caption>
              quasar.dev
            </QItemLabel>
          </QItemSection>
        </QItem>
        <QItem
          clickable
          tag="a"
          target="_blank"
          href="https://github.quasar.dev"
        >
          <QItemSection avatar>
            <QIcon name="code" />
          </QItemSection>
          <QItemSection>
            <QItemLabel>Github</QItemLabel>
            <QItemLabel caption>
              github.com/quasarframework
            </QItemLabel>
          </QItemSection>
        </QItem>
        <QItem
          clickable
          tag="a"
          target="_blank"
          href="https://chat.quasar.dev"
        >
          <QItemSection avatar>
            <QIcon name="chat" />
          </QItemSection>
          <QItemSection>
            <QItemLabel>Discord Chat Channel</QItemLabel>
            <QItemLabel caption>
              chat.quasar.dev
            </QItemLabel>
          </QItemSection>
        </QItem>
        <QItem
          clickable
          tag="a"
          target="_blank"
          href="https://forum.quasar.dev"
        >
          <QItemSection avatar>
            <QIcon name="record_voice_over" />
          </QItemSection>
          <QItemSection>
            <QItemLabel>Forum</QItemLabel>
            <QItemLabel caption>
              forum.quasar.dev
            </QItemLabel>
          </QItemSection>
        </QItem>
        <QItem
          clickable
          tag="a"
          target="_blank"
          href="https://twitter.quasar.dev"
        >
          <QItemSection avatar>
            <QIcon name="rss_feed" />
          </QItemSection>
          <QItemSection>
            <QItemLabel>Twitter</QItemLabel>
            <QItemLabel caption>
              @quasarframework
            </QItemLabel>
          </QItemSection>
        </QItem>
        <QItem
          clickable
          tag="a"
          target="_blank"
          href="https://facebook.quasar.dev"
        >
          <QItemSection avatar>
            <QIcon name="public" />
          </QItemSection>
          <QItemSection>
            <QItemLabel>Facebook</QItemLabel>
            <QItemLabel caption>
              @QuasarFramework
            </QItemLabel>
          </QItemSection>
        </QItem>
      </QList>
    </QDrawer>

    <QPageContainer>
      <RouterView />
    </QPageContainer>
  </QLayout>
</template>

<script>
export default {
  name: 'MyLayout',

  data() {
    return {
      leftDrawerOpen: false,
    };
  },
};
</script>
