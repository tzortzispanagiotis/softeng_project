struct plist {
    int id;
    pid_t p ;
    char name[TASK_NAME_SIZE];
    struct plist *pointer;
}
typedef struct plist plist ;
static plist* nowrunning , end ;
int nproc;




