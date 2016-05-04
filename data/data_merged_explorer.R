library(dplyr)
dmerged_path <- "/Users/shipo/Projects/slidebrothers/data/data_merged_r.csv" 
dmerged <- read.csv(dmerged_path)

# transfer col year from factor to numeric 
dmerged$Year <- dmerged$Year %>% as.character() %>% as.numeric()
dmerged$imdbVotes <- dmerged$imdbVotes %>% as.character() %>% as.numeric()

# see the data distribution
dmerged %>% filter(Year <= 1980) %>% nrow()
dmerged %>% filter(Year >= 1981, Year <= 2000) %>% nrow()
dmerged %>% filter(Year >= 2001) %>% nrow()
dmerged %>% filter(imdbVotes > 20000) %>% nrow()
dmerged %>% filter(imdbVotes > 20000, imdbVotes < 200000) %>% nrow()

# cbind a fake data.frame
t <- c() 
for (i in 2:4) {
  t[i-1] <- as.character(recommend_table[[i]][1])
}
r1 <- rep(t[1], nrow(dmerged))
r2 <- rep(t[2], nrow(dmerged))
r3 <- rep(t[3], nrow(dmerged))

dmerged <- dmerged %>% select(imdbID, Title, Year, imdbRating, imdbVotes, Rated, Runtime, genres)
dmerged <- cbind(dmerged, r1, r2, r3)

write.csv(dmerged, file = "/Users/shipo/Projects/slidebrothers/data/data_merged.csv")
