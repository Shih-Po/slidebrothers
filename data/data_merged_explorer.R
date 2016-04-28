library(dplyr)
dmerged_path <- "/Users/shipo/Projects/slidebrothers/data/data_merged.csv" 
dmerged <- read.csv(dmerged_path)

# transfer col year from factor to numeric 
dmerged$Year <- dmerged$Year %>% as.character() %>% as.numeric()
dmerged$imdbVotes <- dmerged$imdbVotes %>% as.character() %>% as.numeric()

# see the data distribution
dmerged %>% filter(Year < 1980) %>% nrow()  # 2368
dmerged %>% filter(Year > 1981, Year < 2000) %>% nrow() # 3307
dmerged %>% filter(Year > 2001) %>% nrow() # 3891

dmerged %>% filter(imdbVotes > 20000) %>% nrow()
