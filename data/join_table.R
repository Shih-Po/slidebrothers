library(dplyr)
omdb_path <- "/Users/shipo/Projects/slidebrothers/data/omdb.csv" 
omdb_csv <- read.csv(omdb_path)
data_path <- "/Users/shipo/Projects/slidebrothers/data/data.csv" 
data_csv <- read.csv(data_path, header = FALSE, colClasses=c("V1"="character"))

# 整理表格
t <- omdb_csv %>% select(imdbID, Title, Year, imdbRating, imdbVotes, Rated, Runtime, Director, Actors, Plot, Poster)
t2 <- data_csv %>% select(V1, V3, V5, V4)
colnames(t2) <- c("imdbID", "genres", "lensAvg", "lensCount")
t2$imdbID <- paste0("tt", t2$imdbID)

# join 
data_merged <- inner_join(t, t2)
nrow(data_merged)
head(data_merged)

# normalize
data_merged$imdbVotes <- gsub(",", replacement = "", data_merged$imdbVotes)

# ouput
write.csv(data_merged, file = "/Users/shipo/Projects/slidebrothers/data/data_merged.CSV")
