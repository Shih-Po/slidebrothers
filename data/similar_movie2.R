recommend_table <- lapply(3001:5000, function(n){
  cmp_recommend_row(n)
}) %>% Reduce(f = rbind)


write.csv(recommend_table, file = "/Users/shipo/Projects/slidebrothers/data/recommend_table3001_5000.csv")