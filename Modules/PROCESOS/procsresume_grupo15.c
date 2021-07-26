#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/module.h>
#include <linux/list.h>
#include <linux/types.h>
#include <linux/slab.h>
#include <linux/sched.h>
#include <linux/string.h>
#include <linux/fs.h>
#include <linux/seq_file.h>
#include <linux/proc_fs.h>
#include <linux/sched/signal.h>

#define FileProc "procsresume_grupo15"




static int pstree(struct seq_file *m, void *v)
{
    struct task_struct *task_list;
    unsigned int process_count = 0;
    unsigned int process_running = 0;
    unsigned int process_interruptible = 0;
    unsigned int process_uninterruptible = 0;
    unsigned int process_stopped = 0;
    unsigned int process_zombie = 0;
    for_each_process(task_list) {
        switch (task_list->state) {
            case TASK_RUNNING:
                process_running++;
                break;
            case TASK_INTERRUPTIBLE:
                process_interruptible++;
                break;
            case TASK_UNINTERRUPTIBLE:
                process_uninterruptible++;
                break;
            case __TASK_STOPPED:
                process_stopped++;
                break;
            case EXIT_ZOMBIE:
                process_zombie++;
                break;
            default:
            {
                break;
            }
        }
        process_count++;    
    }
    seq_printf(m,"%d;", process_count);
    seq_printf(m,"%d;", process_running);
    seq_printf(m,"%d;", process_interruptible);
    seq_printf(m,"%d;", process_uninterruptible);
    seq_printf(m,"%d;", process_stopped);
    seq_printf(m,"%d", process_zombie);
    return 0;
}

static int processinfo_proc_open(struct inode *inode, struct file *file)
{
    return single_open(file, pstree, NULL);
}

static const struct file_operations procsinfo_proc_fops = {
    .open       = processinfo_proc_open,
    .read       = seq_read,
    .llseek     = seq_lseek,
    .release    = single_release,
};

static int __init start_function(void)
{
    printk(KERN_INFO "Hola mundo, somos el grupo 15 y este es el resumen de procesos\n");
    proc_create(FileProc, 0, NULL, &procsinfo_proc_fops); 
    return 0;
}

 
static void __exit clean_function(void)
{
    remove_proc_entry(FileProc, NULL); 
    printk(KERN_INFO "Sayonara mundo, somos el grupo 15 y este fue el resumen de procesos\n");
}
 
module_init(start_function);
module_exit(clean_function);
MODULE_DESCRIPTION("Totales de procesos Grupo 15");
MODULE_LICENSE("GPL");
