recommend_table <- lapply(8001:nrow(d), function(n){
  cmp_recommend_row(n)
}) %>% Reduce(f = rbind)


write.csv(recommend_table, file = "/Users/shipo/Projects/slidebrothers/data/recommend_table8001_10329.csv")


rt1 <- read.csv("/Users/shipo/Projects/slidebrothers/data/recommend_table1_3000.csv") %>% select(imdbID, r1, r2, r3)
rt2 <- read.csv("/Users/shipo/Projects/slidebrothers/data/recommend_table3001_5000.csv") %>% select(imdbID, r1, r2, r3)
rt3 <- read.csv("/Users/shipo/Projects/slidebrothers/data/recommend_table5001_8000.csv") %>% select(imdbID, r1, r2, r3)
rt4 <- read.csv("/Users/shipo/Projects/slidebrothers/data/recommend_table8001_10329.csv") %>% select(imdbID, r1, r2, r3)

recommend_table_all <- rbind(rt1, rt2, rt3, rt4)
summary(recommend_table_all)

write.csv(recommend_table_all, file = "/Users/shipo/Projects/slidebrothers/data/recommend_table_all.csv")

dmerged <- dmerged %>% select(imdbID, Title, Year, imdbRating, imdbVotes, Rated, Runtime, genres)
dmerged <- left_join(dmerged, recommend_table_all)

write.csv(dmerged, file = "/Users/shipo/Projects/slidebrothers/data/data_merged_r.csv")


