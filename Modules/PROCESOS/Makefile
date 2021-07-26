ifneq ($(KERNELRELEASE),)
# kbuild part of makefile
obj-m  := procsresume_grupo15.o

else
# normal makefile
    KDIR ?= /lib/modules/`uname -r`/build

default:
	$(MAKE) -C $(KDIR) M=$$PWD

endif