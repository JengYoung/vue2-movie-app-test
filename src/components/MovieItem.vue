<template>
  <RouterLink
    :to="`/movie/${movie.imdbID}`"
    :style="{ backgroundImage: `url(${movie.Poster})` }"
    class="movie"
  >
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </RouterLink>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.movie {
  position: relative;
  $size: 273px;
  width: $size;
  height: $size * 3 / 2;
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-size: cover;
  overflow: hidden;
  &:hover::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border: 6px solid $primary;
    cursor: pointer;
  }
  .info {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 14px;
    font-size: 14px;
    text-align: center;
    box-sizing: border-box;
    backdrop-filter: blur(10px); // 배경 이미지 필터 (앞 필터: filter)
    background-color: rgba($black, 0.3);
    .year {
      color: $primary;
    }
    .title {
      color: $white;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>