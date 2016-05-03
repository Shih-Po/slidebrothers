library(dplyr)
library(compiler)

# load table
dmerged_path <- "/Users/shipo/Projects/slidebrothers/data/data_merged.csv" 
dmerged <- read.csv(dmerged_path) # %>% slice(1:5000)
omdb_path <- "/Users/shipo/Projects/slidebrothers/data/omdb.csv"
omdb <- read.csv(omdb_path) # %>% slice(1:5000)
# select necessary col
om <- omdb %>% select(imdbID, Title, Year, Rated, Director, Actors, Genre)
dm <- dmerged %>% select(imdbID, genres)
# join
d <- left_join(om, dm)

# get the movie attr
# input data, data id; output movie_a list
movie_attr = function(d, n) {
  dD <- d[n, ]$Director %>% as.character() %>% strsplit(split=", ",fixed=T)
  dA <- d[n, ]$Actors %>% as.character() %>% strsplit(split=", ",fixed=T)
  dG <- d[n, ]$Genre %>% as.character() %>% strsplit(split=", ",fixed=T)
  #dg <- d[n, ]$genres %>% as.character() %>% strsplit(split="|",fixed=T)
  dR <- d[n, ]$Rated %>% as.character()
  # add 導演、演員
  movie_a <- list()
  movie_a$Director <- as.vector(dD[[1]])
  movie_a$Actors <- as.vector(dA[[1]])
  movie_a$Genre <- as.vector(dG[[1]])
  #movie_a$genres <- as.vector(dg[[1]])
  movie_a$Rated <- as.vector(dR)
  return(movie_a)
}
ma_list <- sapply(1:nrow(d), movie_attr, d=d)

# input data, movie id, compare movie id; output a similar score 
compare_movie = function(n, i) {
  sim_score <- c()
  d1 <- ma_list[, n]
  di <- ma_list[, i]
  # set the score
  sD <- intersect(d1$Director, di$Director) %>% length() * 3
  sA <- intersect(d1$Actors, di$Actors) %>% length()
  sG <- intersect(d1$Genre, di$Genre) %>% length()
  # sg <- intersect(d1$genres, di$genres) %>% length()
  sR <- intersect(d1$Rated, di$Rated) %>% length()
  sim_score <- sD + sA + sG + sR
  if (i == n) {
    sim_score <- 0
  }
  return(sim_score)
}
# cmp_compare_movie <- compiler::cmpfun(compare_movie)
cmp_compare_movie <- cmpfun(compare_movie)

# input data, data id; output similar movie id, similar score data.frame
show_similar_movie = function(n) {
  # sapply 改寫 for
  sc_c <- sapply(1:nrow(d), cmp_compare_movie, n=n)
  
  # set the similar barrier
  sc_index <- which(sc_c > 1)
  # set the dataframe
  imdbID_c <- as.character(d[sc_index, ]$imdbID)
  similarScore_c <- sc_c[sc_index]
  sc_df <- data.frame(imdbID = imdbID_c, similarScore = similarScore_c)
  
  # sort and get top-3
  sort_sc_df <- sc_df[order(sc_df$similarScore ,decreasing=TRUE), ] %>% head(3)
  return(sort_sc_df)
}
# cmp_show_similar_movie <- compiler::cmpfun(show_similar_movie)
cmp_show_similar_movie <- cmpfun(show_similar_movie)

recommend_row = function(n) {
  smovie <- cmp_show_similar_movie(n)
  imdbID <- d[n, ]$imdbID
  r1 <- as.character(smovie[[1]][1])
  r2 <- as.character(smovie[[1]][2])
  r3 <- as.character(smovie[[1]][3])
  r_row <- data.frame(imdbID = imdbID, r1 = r1, r2 = r2, r3 = r3)
  print(n)
  return(r_row)
}
#cmp_recommend_row <- compiler::cmpfun(recommend_row)
cmp_recommend_row <- cmpfun(recommend_row)

# ---------------------------------------------------
recommend_table <- lapply(1:3000, function(n){
  cmp_recommend_row(n)
}) %>% Reduce(f = rbind)
recommend_table

write.csv(recommend_table, file = "/Users/shipo/Projects/slidebrothers/data/recommend_table1_3000.csv")
