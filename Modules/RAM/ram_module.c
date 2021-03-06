#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/mm.h>
#include <linux/fs.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>

//#define nombreArchivo "ram_module"
#define nombreArchivo "mem_grupo18"
struct sysinfo i; //stuct que contiene la informacion de la ram

static int mostrarDatos(struct seq_file *f, void *v)
{
    si_meminfo(&i);
    seq_printf(f, "Total:%ld;Libre:%ld;Uso:%ld", (i.totalram), (i.freeram), (i.totalram - i.freeram));
    return 0;
}

static int info_proc_open(struct inode *inode, struct file *file)
{
    return single_open(file, mostrarDatos, NULL);
}

static const struct file_operations informacion = {
    .owner = THIS_MODULE,
    .open = info_proc_open,
    .read = seq_read,
    .llseek = seq_lseek,
    .release = single_release,
};

static int __init initFuncion(void)
{
    printk(KERN_INFO "Hola mundo, somos el grupo 18\n");
    proc_create(nombreArchivo, 0, NULL, &informacion);
    return 0;
}

static void __exit cleanFuncion(void)
{
    printk(KERN_INFO "Adios mundo, somos el grupo 18\n");
    remove_proc_entry(nombreArchivo, NULL);
}

module_init(initFuncion);
module_exit(cleanFuncion);

MODULE_AUTHOR("Diego Berrios");
MODULE_DESCRIPTION("Modulo para el consumo de Ram.");
MODULE_LICENSE("GPL");