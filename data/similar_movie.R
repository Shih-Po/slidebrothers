library(dplyr)
# load table
dmerged_path <- "/Users/shipo/Projects/slidebrothers/data/data_merged.csv" 
dmerged <- read.csv(dmerged_path) #%>% slice(1:2000)
omdb_path <- "/Users/shipo/Projects/slidebrothers/data/omdb.csv"
omdb <- read.csv(omdb_path) #%>% slice(1:2000)
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
  dg <- d[n, ]$genres %>% as.character() %>% strsplit(split="|",fixed=T)
  dR <- d[n, ]$Rated %>% as.character()
  # add 導演、演員
  movie_a <- list()
  movie_a$Director <- as.vector(dD[[1]])
  movie_a$Actors <- as.vector(dA[[1]])
  movie_a$Genre <- as.vector(dG[[1]])
  movie_a$genres <- as.vector(dg[[1]])
  movie_a$Rated <- as.vector(dR)
  return(movie_a)
}


# input data, movie id, compare movie id; output a similar score 
compare_movie = function(d, n, i) {
  sim_score <- c()
  d1 <- movie_attr(d, n)
  di <- movie_attr(d, i)
  # set the score
  sD <- intersect(d1$Director, di$Director) %>% length() * 3
  sA <- intersect(d1$Actors, di$Actors) %>% length()
  sG <- intersect(d1$Genre, di$Genre) %>% length()
  sg <- intersect(d1$genres, di$genres) %>% length()
  sR <- intersect(d1$Rated, di$Rated) %>% length()
  sim_score <- sD + sA + sG + sg + sR
  if (i == n) {
    sim_score <- 0
  }
  return(sim_score)
}

# input data, data id; output similar movie id, similar score data.frame
show_similar_movie = function(d, n) {
  # sapply 改寫 for
  sc_c <- sapply(1:nrow(d), compare_movie, d = d, n = n)
  
  # set the similar barrier
  sc_index <- which(sc_c > 1)
  # set the dataframe
  imdbID_c <- as.character(d[sc_index, ]$imdbID)
  similarScore_c <- sc_c[sc_index]
  sc_df <- data.frame(imdbID = imdbID_c, similarScore = similarScore_c)
  
  # sort and get top-3
  sort_sc_df <- sc_df[order(sc_df$similarScore ,decreasing=TRUE), ] %>% head(3)
  print(n)
  return(sort_sc_df)
}

recommend_row = function(d, n) {
  smovie <- show_similar_movie(d, n)
  imdbID <- d[n, ]$imdbID
  r1 <- as.character(smovie[[1]][1])
  r2 <- as.character(smovie[[1]][2])
  r3 <- as.character(smovie[[1]][3])
  r_row <- data.frame(imdbID = imdbID, r1 = r1, r2 = r2, r3 = r3) 
  return(r_row)
}

recommend_table <- lapply(1:nrow(d), function(n){
  recommend_row(d, n)
}) %>% Reduce(f = rbind)
View(recommend_table)

write.csv(recommend_table, file = "/Users/shipo/Projects/slidebrothers/data/recommend_table.csv")

