<template>
  <!-- webpack에서는 이렇게 대문자로 작성할 수 있음. -->
  <div>
    <Headline />
    <Search />
    <MovieList />
  </div>
</template>

<script>
import Search from "@/components/Search";
import MovieList from "@/components/MovieList";
import Headline from "@/components/Headline";
export default {
  components: {
    Search,
    MovieList,
    Headline,
  },
};
</script>